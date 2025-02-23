import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import React from "react"
  interface Alert {
    id: string
    client: string
    businessUnit: string
    rep: string
    status: "HIGH" | "MODERATE"
  }
  
  interface AlertsTableProps {
    alerts: Alert[]
  }
  
  export function AlertsTable({ alerts }: AlertsTableProps) {
    return (
      <Card>
      <CardHeader>
        <CardTitle>Alertas</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">CLIENTE</TableHead>
              <TableHead>BUSINESS UNIT</TableHead>
              <TableHead>REP</TableHead>
              <TableHead className="text-right">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.client}</TableCell>
                <TableCell>{alert.businessUnit}</TableCell>
                <TableCell>{alert.rep}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium
                      ${alert.status === "HIGH" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {alert.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    )
  }
  
  
  
  