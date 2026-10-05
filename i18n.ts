import { getRequestConfig } from "next-intl/server";

// This is the server-side config for next-intl.
// Since we use a client-side language context (not URL-based routing),
// we default to "en" here. The actual locale switching is handled client-side
// via the I18nProvider wrapper which passes messages dynamically.
export default getRequestConfig(async () => {
  const locale = "en";
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
