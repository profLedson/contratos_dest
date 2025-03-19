import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/about": {};
  "/post/:postId": {
    "postId": string;
  };
  "/dashboard": {};
  "/dashboard/edit/finances": {};
  "/dashboard/edit/personal-info": {};
};