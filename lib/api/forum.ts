import { getAPIBaseURL } from "@/config/url";

interface AuthenticationRequest {
  token: string;
}

export type Thread = {
  id: number;
  title: string;
  textResume: string;
  replies: number;
  author: { name: string; idPicture: number };
  date: string;
  categorie: Category[];
};

export type Category = {
  id: number;
  libelle: string;
  categorieChildren: Category[];
};

interface GetThreadsParams {
  categorieId?: Category["id"];
}
type GetThreadsResponse = Thread[];
export async function getThreads({
  categorieId,
}: GetThreadsParams): Promise<GetThreadsResponse> {
  let url = `${getAPIBaseURL()}/message`;

  if (categorieId) {
    url += `?categorieId=${categorieId}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch threads");
  }

  return response.json();
}

interface CreateThreadParams extends AuthenticationRequest {
  contenu: string;
  titre: string;
  categorie: Category["id"];
}

type User = {
  id: number;
  mail: string;
  username: string;
  password: string;
  token: string;
  phone: string;
  adresse: string;
  zipCode: string;
  city: string;
};

type Comment = {
  id: number;
  contenu: string;
  date: string;
  user: User;
};

type CreateThreadResponse = Thread & { user: User } & {
  commentaires: Comment[];
};

export async function createThreads({
  token,
  contenu,
  titre,
  categorie,
}: CreateThreadParams): Promise<CreateThreadResponse> {
  let url = `${getAPIBaseURL()}/message`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contenu,
      titre,
      categorie,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create threads");
  }

  return response.json();
}

interface ModifyThreadParams extends AuthenticationRequest {
  messageId: number;

  contenu: string;
  titre: string;
  categorie: number;
}
export const modifyThreadParams = async ({
  token,

  messageId,
  contenu,
  titre,
  categorie,
}: ModifyThreadParams) => {
  let url = `${getAPIBaseURL()}/message/${messageId}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contenu,
      titre,
      categorie,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to modify threads");
  }

  return response.json();
};

interface PostCommentsOnMessageIdParams extends AuthenticationRequest {
  messageId: number;
  contenu: string;
}
export async function postCommentsOnMessageId({
  token,

  messageId,
  contenu,
}: PostCommentsOnMessageIdParams): Promise<Comment> {
  let url = `${getAPIBaseURL()}/message/${messageId}/commentary`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contenu,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to modify threads");
  }

  return response.json();
}
