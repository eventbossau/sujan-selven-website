import { redirect } from 'next/navigation';
import { news } from '@/lib/data';

export default function Page() {
  redirect('/news/' + news[0].slug);
}
