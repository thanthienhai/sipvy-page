"use client"

import { useState, useSyncExternalStore } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/lib/types"

interface ProductDetailSectionsProps {
  product: Product
}

type SectionId = "description" | "specifications" | "brewing"

const DESKTOP_QUERY = "(min-width: 768px)"

/**
 * Single source of truth for the breakpoint. The server snapshot is "mobile" so SSR output (and SEO
 * content, the description section is open by default) is one tree; after hydration the matching
 * layout replaces it. Only ONE tree is ever in the DOM, so there are no duplicate ids/content.
 */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(DESKTOP_QUERY)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  )
}

function DescriptionBody({ product }: { product: Product }) {
  return <p className="leading-relaxed text-gray-700">{product.description || "Chưa có mô tả cho sản phẩm này."}</p>
}

function SpecificationsBody({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      {product.specifications.length === 0 && <p className="text-sm text-gray-500">Chưa cập nhật thông số sản phẩm.</p>}
      {product.specifications.map((spec, index) => (
        <div key={index} className="flex justify-between gap-4 border-b border-gray-100 py-2 last:border-0">
          <span className="font-medium text-green-900">{spec.label}:</span>
          <span className="text-right text-gray-700">
            {spec.value}
            {spec.unit ? ` ${spec.unit}` : ""}
          </span>
        </div>
      ))}
    </div>
  )
}

function BrewingBody({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      {product.brewingInstructions.length === 0 && <p className="text-sm text-gray-500">Chưa cập nhật hướng dẫn pha.</p>}
      {product.brewingInstructions.map((instruction) => (
        <div key={instruction.step} className="flex gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-medium text-green-800">
            {instruction.step}
          </div>
          <div className="flex-1">
            <p className="text-gray-700">{instruction.instruction}</p>
            {(instruction.temperature || instruction.time) && (
              <div className="mt-1 flex flex-wrap gap-4 text-sm text-green-700">
                {instruction.temperature && <span>Nhiệt độ: {instruction.temperature}</span>}
                {instruction.time && <span>Thời gian: {instruction.time}</span>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProductDetailSections({ product }: ProductDetailSectionsProps) {
  const isDesktop = useIsDesktop()
  // Lifted so crossing the md breakpoint (tabs <-> accordion) keeps the open section and any review draft.
  const [section, setSection] = useState<SectionId | "">("description")

  return (
    <div className="mb-12">
      {!isDesktop ? (
        <Accordion
          type="single"
          collapsible
          value={section}
          onValueChange={(value) => setSection(value as SectionId | "")}
          className="rounded-lg border border-stone-200 px-4"
        >
          <AccordionItem value="description">
            <AccordionTrigger className="text-left text-green-900">Mô tả</AccordionTrigger>
            <AccordionContent>
              <DescriptionBody product={product} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specifications">
            <AccordionTrigger className="text-left text-green-900">Thông số</AccordionTrigger>
            <AccordionContent>
              <SpecificationsBody product={product} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brewing">
            <AccordionTrigger className="text-left text-green-900">Cách pha</AccordionTrigger>
            <AccordionContent>
              <BrewingBody product={product} />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      ) : (
        <Tabs value={section || "description"} onValueChange={(value) => setSection(value as SectionId)}>
          <TabsList className="grid h-auto w-full grid-cols-3">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="specifications">Thông số</TabsTrigger>
            <TabsTrigger value="brewing">Cách pha</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <DescriptionBody product={product} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <SpecificationsBody product={product} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brewing" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <BrewingBody product={product} />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      )}
    </div>
  )
}
