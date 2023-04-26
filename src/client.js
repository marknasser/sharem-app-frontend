import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "vs8cp8wf",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token:
    "skJy7DS2pOTSiwX3bq3fn2S0czd7Mu1PqXPKnoJJ3VINWutnIvZOLCLTzoIALSh3lj84vHTo1JKZTyIMVZDKUlpLAk1akXBPHUb5O5K1IKCRthSBySlqm7Ccx4VJleugdQxvsSQyMrOQV5iE6su4wsofyKFMaIYNXAgFxh02tNwKhd4xiZ4N",
});

// i can find it sanity docs to dealing with images
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
