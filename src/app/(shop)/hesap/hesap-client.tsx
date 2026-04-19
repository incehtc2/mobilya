"use client";

import { useState } from "react";
import { updateProfile } from "@/app/auth/actions";
import { CheckCircle2, AlertCircle, Pencil, X } from "lucide-react";

interface Props {
  initialName: string;
  initialPhone: string;
  email: string;
}

const inputCls =
  "w-full bg-cream border border-cream-darker px-4 py-3 text-sm text-obsidian placeholder:text-mist/40 focus:outline-none focus:border-gold transition-colors duration-200 font-body";

export function HesapClient({ initialName, initialPhone, email }: Props) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const fd = new FormData(e.currentTarget);
    const result = await updateProfile(fd);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  }

  return (
    <div className="bg-cream-dark border border-cream-darker overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-cream-darker">
        <h2 className="font-body text-xs tracking-[0.2em] uppercase text-obsidian font-medium">
          Profil Bilgileri
        </h2>
        <button
          onClick={() => { setEditing((v) => !v); setSuccess(false); setError(null); }}
          className="text-mist hover:text-obsidian transition-colors"
        >
          {editing ? <X size={15} strokeWidth={1.5} /> : <Pencil size={14} strokeWidth={1.5} />}
        </button>
      </div>

      <div className="p-6">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-obsidian text-cream font-display text-2xl font-light">
            {(name || email).slice(0, 1).toUpperCase()}
          </div>
        </div>

        {!editing ? (
          <div className="space-y-4">
            {[
              { label: "Ad Soyad", value: name || "—" },
              { label: "E-posta", value: email },
              { label: "Telefon", value: phone || "—" },
            ].map((row) => (
              <div key={row.label} className="border-b border-cream-darker pb-4 last:border-0 last:pb-0">
                <p className="font-body text-[10px] tracking-widest uppercase text-mist mb-1">{row.label}</p>
                <p className="font-body text-sm text-obsidian">{row.value}</p>
              </div>
            ))}

            {success && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded">
                <CheckCircle2 size={13} />
                <span className="font-body text-xs">Bilgiler güncellendi.</span>
              </div>
            )}

            <button
              onClick={() => setEditing(true)}
              className="w-full border border-cream-darker text-mist py-3 font-body text-[11px] tracking-widest uppercase hover:border-obsidian hover:text-obsidian transition-colors mt-2"
            >
              Düzenle
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-body text-[10px] tracking-widest uppercase text-mist">Ad Soyad</label>
              <input
                name="full_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className={inputCls}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-body text-[10px] tracking-widest uppercase text-mist">E-posta</label>
              <input
                value={email}
                disabled
                className={`${inputCls} opacity-50 cursor-not-allowed`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-body text-[10px] tracking-widest uppercase text-mist">Telefon</label>
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+90 5XX XXX XX XX"
                className={inputCls}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
                <AlertCircle size={13} />
                <span className="font-body text-xs">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setEditing(false); setName(initialName); setPhone(initialPhone); }}
                className="border border-cream-darker text-mist py-3 font-body text-[11px] tracking-widest uppercase hover:border-obsidian hover:text-obsidian transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-obsidian text-cream py-3 font-body text-[11px] tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <><span className="h-3 w-3 rounded-full border border-cream/40 border-t-cream animate-spin" /> Kaydediliyor</>
                ) : "Kaydet"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
