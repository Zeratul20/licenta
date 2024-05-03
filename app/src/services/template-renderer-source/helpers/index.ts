export type DataRenderer = (data:any) => string

export interface TemplateRender {
  body: DataRenderer
}
export type TemplateRenderFactory = () => TemplateRender

