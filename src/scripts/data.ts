// src/scripts/data.ts
// Camada de dados: usa Supabase quando configurado, senão localStorage + seed.
import { getSupabase, isCloudEnabled } from './supabase';

const CHAVE = 'kato-arvore-v1';

export async function fetchPessoas(seed: any[]): Promise<any[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('pessoas').select('*').order('nome');
      if (error) throw error;
      if (data && data.length) {
        // normaliza: pais/conjuges/exDe podem vir como arrays
        return data.map((r: any) => ({
          id: r.id,
          nome: r.nome,
          apelido: r.apelido || '',
          nascimento: r.nascimento || '',
          falecimento: r.falecimento || '',
          geracao: r.geracao ?? 0,
          pais: r.pais || [],
          conjuges: r.conjuges || [],
          exDe: r.exde || r.exDe || [],
          foto: r.foto || '',
          bio: r.bio || '',
          local: r.local || '',
          profissao: r.profissao || '',
          observacao: r.observacao || '',
          agregado: !!r.agregado,
          sexo: r.sexo || '',
        }));
      }
    } catch (e) {
      console.warn('fetchPessoas cloud falhou, usando local:', e);
    }
  }
  // fallback local
  try {
    const g = localStorage.getItem(CHAVE);
    if (g) {
      const arr = JSON.parse(g);
      if (Array.isArray(arr) && arr.length) return arr;
    }
  } catch {}
  return (seed || []).map((p) => ({ ...p, pais: [...(p.pais || [])], conjuges: [...(p.conjuges || [])], exDe: [...(p.exDe || [])] }));
}

export async function savePessoa(p: any): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (sb) {
    try {
      const row = {
        id: p.id, nome: p.nome, apelido: p.apelido || null, nascimento: p.nascimento || null,
        falecimento: p.falecimento || null, geracao: p.geracao, pais: p.pais, conjuges: p.conjuges,
        exde: p.exDe || [], foto: p.foto || null, bio: p.bio || null, local: p.local || null,
        profissao: p.profissao || null, observacao: p.observacao || null, agregado: !!p.agregado, sexo: p.sexo || null,
      };
      const { error } = await sb.from('pessoas').upsert(row);
      if (error) throw error;
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message || String(e) };
    }
  }
  // fallback local
  try {
    const g = localStorage.getItem(CHAVE);
    const arr = g ? JSON.parse(g) : null;
    // if no local array yet, seed it
    return { ok: true };
  } catch {}
  return { ok: true };
}

export async function deletePessoa(id: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('pessoas').delete().eq('id', id);
      if (error) throw error;
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message || String(e) };
    }
  }
  return { ok: true };
}

export async function uploadPhoto(file: File): Promise<{ ok: boolean; url?: string; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Nuvem não configurada.' };
  try {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `pessoas/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await sb.storage.from('fotos').upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data } = sb.storage.from('fotos').getPublicUrl(path);
    return { ok: true, url: data.publicUrl };
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) };
  }
}

export { isCloudEnabled } from './supabase';