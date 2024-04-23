const defaultRequestInit = {
  headers: { "Content-Type": "*/*" },
} as RequestInit;

const getUrl = (url: string, parameters?: Record<string, string>) =>
  `${url}${new URLSearchParams(parameters)}`;

export const get = async function (
  url: string,
  parameters?: Record<string, string>
) {
  const requestInit: RequestInit = { method: "GET", ...defaultRequestInit };
  const response = await fetch(getUrl(url, parameters), requestInit);
  return { data: await response.text() };
};
