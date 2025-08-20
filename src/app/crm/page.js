// Direct access block
import { redirect } from "next/navigation";

export default function CRMIndex() {
  redirect("/login"); // force redirect to login if someone tries /crm
}