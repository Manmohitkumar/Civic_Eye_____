import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit } from "lucide-react";
import { format } from "date-fns";

interface Complaint {
  id: string;
  complaint_id: string;
  title: string;
  category: string;
  status: string;
  location: string;
  created_at: string;
}

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      resolved: "default",
      in_progress: "secondary",
      pending: "destructive",
    };

    const colors: Record<string, string> = {
      resolved: "bg-green-100 text-green-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      pending: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={colors[status] || ""} variant={variants[status] || "default"}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return <div className="text-center py-8">Loading complaints...</div>;
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Complaint ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint.id}>
              <TableCell className="font-medium">{complaint.complaint_id}</TableCell>
              <TableCell>{format(new Date(complaint.created_at), "MMM dd, yyyy")}</TableCell>
              <TableCell>{complaint.title}</TableCell>
              <TableCell>{complaint.location}</TableCell>
              <TableCell>{complaint.category}</TableCell>
              <TableCell>{getStatusBadge(complaint.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline">
                    <Eye size={16} />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComplaintTable;
