'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';

export default function CampaignForm() {
  const user = useAuth();
  const router = useRouter();

  const handleCreate = async () => {
    const title = prompt('Enter campaign title');
    if (!title || !user) return;

    const { data, error } = await supabase
      .from('campaigns')
      .insert([{ title, created_by: user.id }])
      .select()
      .single();

    if (data && !error) {
      await supabase.from('user_campaign_roles').insert([
        {
          user_id: user.id,
          campaign_id: data.id,
          role: 'GM',
        },
      ]);
      router.refresh(); // refresh current page to load new campaign
    } else {
      alert(error?.message);
    }
  };

  return <button onClick={handleCreate}>Create New Campaign</button>;
}
