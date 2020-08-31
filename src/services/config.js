// export let server = "http://47.112.195.142:9100";

export let server = "http://127.0.0.1:9100";
if (process.env.NODE_ENV === "production") {
  server = "http://47.112.195.142:9100";
}
export default {
  server
};
