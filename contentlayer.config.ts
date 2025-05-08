// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
//   filePathPattern: `**/*.md`,
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string'},
    date: { type: 'date', required: true },
    published: { type: 'boolean', default: true },
    image: { type: 'string', required: true},
    authors: { type: 'list', of: { type: 'string' }, required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    category: { type: 'string', required: false },
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath },
    // url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: './content', documentTypes: [Post] })