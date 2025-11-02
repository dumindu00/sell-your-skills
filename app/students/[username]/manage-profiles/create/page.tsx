import { CreateForm } from "./_components/create-form";


interface CreateProfileProps {
    params: {
        username: string;
    }
}

const CreateProfile = ({
    params
}:CreateProfileProps) => {
    return (
        <div className="flex justify-center">

            <CreateForm
                username={params.username}
            />

        </div>
    )
}

export default CreateProfile





