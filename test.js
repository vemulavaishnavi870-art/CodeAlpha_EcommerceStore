const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.ecommerce-cluster.n9burmx.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error("DNS Error:", err);
    } else {
      console.log("SRV Records Found:");
      console.log(addresses);
    }
  }
);