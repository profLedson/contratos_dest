import { Form, Link, redirect, useFetcher, useNavigate, useNavigation } from "react-router";
import type { Route } from "../+types/root"  // Tipos específicos para 

export async function clientLoader({ params }: Route.LoaderArgs) { // Load data from clientside
  let postId = params.postId;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  return await res.json();
}
// export async function loader({params}: Route.LoaderArgs) { // Load data from a server
//   const product = await db.getProduct(params.id) // Postgres, mongodb, sql etc
//   return product;
// }
export async function clientAction({ params }: Route.LoaderArgs) {

  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`,
      {
        method: 'DELETE'
      });
      return { isDeleted: true };
  } catch (error) {
    return { isDeleted: false };
  }
  // return redirect('/dashboard')

}

export function HydrateFallback() {
  return <div>Carregando...</div>;
}

function Post({ loaderData }: Route.ComponentProps | any) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return <p>Navigating...</p>
  }

  const isDeleted = fetcher.data?.isDeleted;

  return (
    <div className="bg-white p-8 text-gray-800 w-500" >      
      <Link to="/dashboard/edit/personal-info">Editar Dados</Link>
      {!isDeleted && (

        <>
          <div>Post ID: {loaderData.postId}</div>
          <div>Title: {loaderData.title}</div>
          <div>Paragraph: {loaderData.body}</div>
        </>

      )}

      <fetcher.Form method="delete">
        <button type="submit" className="cursor-pointer bg-red-500 p-2 text-amber-50" >Delete</button>
        <button onClick={() => {navigate("/")}} className="bg-green-700 cursor-pointer p-2 m-2 text-amber-50">Navegar</button>
      </fetcher.Form>

    </div>
  )
}

export default Post