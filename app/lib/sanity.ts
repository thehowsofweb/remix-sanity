import { createClient } from "@sanity/client"

const projectId = "sy3nlal0"
const dataset = "production"
const apiVersion = "2024-09-26"

export const client = createClient({
   projectId,
   dataset,
   apiVersion,
   useCdn: true,
})
