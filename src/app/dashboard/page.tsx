'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CampaignCard from '@/components/campaigns/CampaignCard';
import dynamic from 'next/dynamic';

// This tells Next.js: “Only load this component on the client”
const CampaignModal = dynamic(() => import('@/components/campaigns/CampaignModal'), {
  ssr: false,
});
import Button from '@/components/ui/Button';
import { useToast } from '@/lib/ToastContext';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const fetchCampaigns = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return showToast('Not authenticated.');

    const { data, error } = await supabase
      .from('campaign_users')
      .select('campaigns(id, title, system, description)')
      .eq('user_id', user.id);

    if (error || !data) {
      showToast(error?.message || 'Failed to fetch campaigns.');
      return;
    }

    const flattened = data.map((entry) => entry.campaigns);
    setCampaigns(flattened);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DashboardLayout>
      <TopBar>
        <h2>Your Campaigns</h2>
        <Button onClick={() => setShowModal(true)}>+ New Campaign</Button>
      </TopBar>

      <Grid>
        {campaigns.length === 0 ? (
          <p>No campaigns yet. Create one!</p>
        ) : (
          campaigns.map((c) => (
            <CampaignCard
              key={c.id}
              id={c.id}
              title={c.title}
              system={c.system}
              description={c.description}
            />
          ))
        )}
      </Grid>

      {showModal && (
        <CampaignModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchCampaigns}
          mode='create'
        />
      )}
    </DashboardLayout>
  );
}
