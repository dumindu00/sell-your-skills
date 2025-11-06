"use client"

import { useMutation } from "convex/react";
import { CreateForm } from "./_components/create-form";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";


interface CreateProfileProps {
    params: {
        username: string;
    }
}

const CreateProfile = ({
    params
}:CreateProfileProps) => {
    const insertSubcategories = useMutation(api.seedSubcategories.create)
    
    useEffect(() =>{
        insertSubcategories({})
    })
    return (
        <div className="flex justify-center">

            <CreateForm
                username={params.username}
            />

        </div>
    )
}

export default CreateProfile





