const UrlParts = function getUrlParts(url) {
  var a = new URL(url)

  return {
      href: a.href,
      host: a.host,
      hostname: a.hostname,
      port: a.port,
      pathname: a.pathname,
      protocol: a.protocol,
      hash: a.hash,
      search: a.search
  };
}

export default UrlParts