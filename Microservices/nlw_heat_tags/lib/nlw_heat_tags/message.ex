# Mapeamento e cast de dados
# Similiar a um objeto

defmodule NlwHeatTags.Message do
    use Ecto.Schema

    import Ecto.Changeset

    @required_params [:message, :username, :email]

    @derive {Jason.Encoder, only: [:id] ++ @required_params}

    schema "messages" do
        field :message, :string
        field :username, :string
        field :email, :string

        timestamps()
    end

    def changeset(params) do
        %__MODULE__{} #Equivalente a colocar o nome do módulo todo
        |> cast(params, @required_params)
        |> validate_required(@required_params)
        |> validate_length(:message, min: 1, max: 140)
        |> validate_format(:email, ~r/@/)
        
    end
end