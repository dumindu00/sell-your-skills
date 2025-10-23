"use client"
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQueries } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";

import { toast } from "sonner";







interface CreateFormProps {
    username: string;
}

const CreateFormSchema = z.object({
  title: z
    .string()
    .min(20, { message: "Title must be at least 20 characters." })
    .max(100, { message: "Title must not be longer than 100 characters." }),

  category: z.string().nonempty({ message: "Please select a category." }),

  subcategoryId: z.string().nonempty({ message: "Please select a subcategory." }),
});

type CreateFormValues = z.infer<typeof CreateFormSchema>

// this can be come from your database or Api
const defaultValues: Partial<CreateFormValues> = {
    title: ""
}

export const CreateForm = ({
    username
}: CreateFormProps) => {
    const categories = useQueries(api.categories.get);
    const [subcategories, setSubcategories] =
    useState<Doc<"subcategories">[]>([]);
    const {
        mutate,
        pending
    } = useApiMutation(api.profile.create);
    const router = useRouter();

    const form = useForm<CreateFormValues>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues,
        mode: "onChange"
    })

    function handleCategoryChange(categoryName: string) {
        if (categories === undefined) return;
        const selectedCategory = categories.find(category => category.name === categoryName);
        if (selectedCategory) {
            setSubcategories(selectedCategory.subcategories)
        }
    }

    function onSubmit(data: CreateFormValues) {
        mutate({
            title:data.title,
            description: "",
            subcategoryId: data.subcategoryId,
        })
        .then((profileId: Id<"profiles">) => {
            toast.info('Profile crated successfully');
            // form.setValue("title", "");
            router.push(`/students/${username}/manage-profile/edit ${profileId}`)
        })
        .catch(() => {
            toast.error("Failed to create Profile!")
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                    <FormItem>
                        <FormLabel></FormLabel>
                    <FormControl>
                        <Input placeholder="We will see what goes here" {...field} />
                    </FormControl>
                    <FormDescription>
                        Craft a rich Profile showcase your abilities...
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                            onValueChange={(categoryName: string) => {
                                field.onChange(categoryName);
                                handleCategoryChange(categoryName);
                            }}
                            defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category">
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                {categories &&( <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category._id}
                                            value={category.name}>
                                        </SelectItem>
                                    ))}
                                </SelectContent>)}
                            </Select>
                            <FormDescription>
                                Select something most relevant to your interests
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="subcategoryId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subcategory</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a subcategory" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {
                                    subcategories.map((subcategory, index) => (
                                        <SelectItem key={index} value={subcategory._id}>
                                                {subcategory.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Subcategory will help buyers pinpoint your service more narrowly.
                        </FormDescription>
                    </FormItem>
                )}
                
                />
                <Button type="submit" disabled={pending}>Save</Button>
            </form> 
        </Form>
    )
}