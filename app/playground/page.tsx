import { PlaygroundLayout } from "@/components/playground/playground-layout"
import { PromptEditor } from "@/components/playground/prompt-editor"
import { TemplateLibrary } from "@/components/playground/template-library"
import { PromptHistory } from "@/components/playground/prompt-history"
import { ExampleGallery } from "@/components/playground/example-gallery"

export default function PlaygroundPage() {
  return (
    <PlaygroundLayout>
      <div className="grid lg:grid-cols-4 gap-8 h-full">
        <div className="lg:col-span-3 space-y-6">
          <PromptEditor />
          <ExampleGallery />
        </div>

        <div className="space-y-6">
          <TemplateLibrary />
          <PromptHistory />
        </div>
      </div>
    </PlaygroundLayout>
  )
}
