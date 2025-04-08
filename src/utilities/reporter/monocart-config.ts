import {FORMATTED_TAGS, FORMATTED_COLUMNS} from '@utilities/reporter/monocart-columns-config'

export const MONOCART_CONFIG = {
  name: `Playwright Automated Test Report`,
  outputFile: `test-results/monocart-report/report.html`,
  customFieldsInComments: true,
  tags: FORMATTED_TAGS,
  columns: FORMATTED_COLUMNS,
  mermaid: {
    scriptSrc: 'https://cdn.jsdelivr.net/npm/mermaid@latest/dist/mermaid.min.js',
    config: {
      startOnLoad: false
    }
  },
}