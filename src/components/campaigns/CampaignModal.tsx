// src/components/campaigns/CampaignModal.tsx
'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/lib/ToastContext';
import ModalShell from '@/components/ui/ModalShell';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const Select = styled.select`
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
`;

const RoleToggle = styled.div`
  display: flex;
  gap: 1rem;
`;

const RoleButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ theme, selected }) => (selected ? theme.colors.rust : theme.colors.border)};
  background: ${({ theme, selected }) =>
    selected ? theme.colors.rustLight : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.rustLight};
    border-color: ${({ theme }) => theme.colors.rust};
  }
`;

const ImageInput = styled.input`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  mode: 'create' | 'edit';
  initialData?: {
    id: string;
    title: string;
    system: string;
    description: string;
    role: 'GM' | 'Player';
    cover_url?: string;
  };
};

export default function CampaignModal({
  onClose,
  onSuccess,
  mode,
  initialData,
}: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [system, setSystem] = useState(initialData?.system || 'Dungeons & Dragons');
  const [description, setDescription] = useState(initialData?.description || '');
  const [role, setRole] = useState<'GM' | 'Player'>(initialData?.role || 'GM');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (initialData?.cover_url) {
      // If needed, you can show image preview here
    }
  }, []);

  const handleSubmit = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return showToast('Not authenticated.');

    let coverUrl: string | null = initialData?.cover_url || null;

    if (coverImage) {
      const { data: upload, error: uploadError } = await supabase.storage
        .from('campaign-covers')
        .upload(`${user.id}/${Date.now()}-${coverImage.name}`, coverImage);

      if (uploadError) {
        showToast('Image upload failed.');
        return;
      }

      const { data: urlData } = supabase.storage
        .from('campaign-covers')
        .getPublicUrl(upload.path);

      coverUrl = urlData?.publicUrl || null;
    }

    if (mode === 'create') {
      const { data: campaign, error } = await supabase
        .from('campaigns')
        .insert({ title, system, description, created_by: user.id, cover_url: coverUrl })
        .select()
        .single();

      if (error || !campaign) return showToast(error?.message || 'Could not create campaign');

      await supabase.from('campaign_users').insert({
        campaign_id: campaign.id,
        user_id: user.id,
        role,
      });
    }

    if (mode === 'edit' && initialData?.id) {
      const { error } = await supabase
        .from('campaigns')
        .update({ title, system, description, cover_url: coverUrl })
        .eq('id', initialData.id);

      if (error) return showToast(error.message);
    }

    onSuccess();
    onClose();
  };

  return (
    <ModalShell onClose={onClose}>
      <h2>{mode === 'create' ? 'Create Campaign' : 'Edit Campaign'}</h2>

      <Label>Title</Label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />

      <Label>System</Label>
      <Select value={system} onChange={(e) => setSystem(e.target.value)}>
        <option>Dungeons & Dragons</option>
      </Select>

      <Label>Description</Label>
      <Input value={description} onChange={(e) => setDescription(e.target.value)} />

      <Label>Role</Label>
      <RoleToggle>
        <RoleButton selected={role === 'GM'} onClick={() => setRole('GM')}>
          GM
        </RoleButton>
        <RoleButton selected={role === 'Player'} onClick={() => setRole('Player')}>
          Player
        </RoleButton>
      </RoleToggle>

      <Label>Cover Image</Label>
      <ImageInput
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
      />

      <Button onClick={handleSubmit}>
        {mode === 'create' ? 'Create Campaign' : 'Save Changes'}
      </Button>
    </ModalShell>
  );
}
