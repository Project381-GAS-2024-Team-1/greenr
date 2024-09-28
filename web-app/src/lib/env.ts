export const JWT_SECRET =
  process.env.JWT_SECRET ||
  (() => {
    console.warn(
      "environment variable `JWT_SECRET` is not set.\nreverting to default."
    );
    return "dev_secret";
  })();

export const HASH_KEY =
  process.env.HASH_KEY ||
  (() => {
    console.warn(
      "environment variable `HASH_KEY` is not set.\nreverting to default."
    );
    return "dev_hash";
  })();
