interface CacheControlObject {
  // RFC 9111 Response Directives
  maxAge?: number;
  mustRevalidate?: true;
  mustUnderstand?: true;
  noCache?: true;
  noStore?: true;
  noTransform?: true;
  private?: true;
  proxyRevalidate?: true;
  public?: true;
  sMaxage?: number;
}

export function parse(header: string): CacheControlObject {
  const result: CacheControlObject = {};
  const directives = header
    .toLowerCase()
    .replace(/\s+/g, "")
    .split(",")
    .map((str) => str.split("=", 2));

  for (const [name, val] of directives) {
    switch (name) {
      case "max-age":
      case "s-maxage":
        {
          const time = parseInt(val, 10);
          if (!isNaN(time) && time >= 0) {
            name === "max-age" ? result.maxAge = time : result.sMaxage = time;
          }
        }
        break;
      case "must-revalidate":
        result.mustRevalidate = true;
        break;
      case "must-understand":
        result.mustUnderstand = true;
        break;
      case "no-cache":
        result.noCache = true;
        break;
      case "no-store":
        result.noStore = true;
        break;
      case "noTransform":
        result.noTransform = true;
        break;
      case "private":
        result.private = true;
        break;
      case "proxy-revalidate":
        result.proxyRevalidate = true;
        break;
      case "public":
        result.public = true;
        break;
    }
  }
  return result;
}