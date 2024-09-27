export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'name'},
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'stripeProductId',
      type: 'string',
      title: 'Stripe Product Id',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {hotspots: true},
    },
  ],
}
