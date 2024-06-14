import { db } from "@/db";
import { redirect } from "next/navigation";
export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action
    "use server";

    // Check the user's inputs and make sure they're valid
    const title = formData.get("title") as string; // from the name properties of html elements
    const code = formData.get("code") as string; // from the name properties of html elements

    // Create a new record in the database
    const snippet = await db.snippet.create({ data: { title, code } });
    console.log("Snippet created! => ", snippet);

    // Redirect the user to the root route
    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a new snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-200 rounded p-2">
          Create
        </button>
      </div>
    </form>
  );
}
