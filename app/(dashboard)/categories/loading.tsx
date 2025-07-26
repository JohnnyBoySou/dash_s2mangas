import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-md border">
        <div className="w-full overflow-auto">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[50px]">
                    <Skeleton className="h-6 w-6 rounded-md" />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <Skeleton className="h-6 w-24" />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <Skeleton className="h-6 w-32" />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <Skeleton className="h-6 w-20" />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
                    <Skeleton className="h-6 w-24 ml-auto" />
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[50px]">
                      <Skeleton className="h-6 w-6 rounded-md" />
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <Skeleton className="h-6 w-24" />
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <Skeleton className="h-6 w-32" />
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <Skeleton className="h-6 w-20" />
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                      <Skeleton className="h-6 w-24 ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
