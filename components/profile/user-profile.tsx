"use client";

import { useSession } from "@/context/session-context";
import { AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

export default function UserProfile() {
  const { user, isConnected, loading } = useSession();

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!isConnected) {
    notFound();
  }

  if (!user) {
    notFound();
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <UserAvatar imageId={user.imageId} username={user.username} />
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="card-title text-primary text-2xl">
                {user.username}
              </h2>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem label="Email" value={user.mail} />
              <InfoItem label="Phone" value={user.phone} />
              <InfoItem label="Address" value={user.adresse} />
              <InfoItem label="City" value={user.city} />
              <InfoItem label="Zip Code" value={user.zipCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: string;
  tooltip?: string;
}) {
  console.log("label", label, value);
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
        {tooltip && (
          <span
            className="label-text-alt tooltip tooltip-left"
            data-tip={tooltip}
          >
            <AlertCircle className="h-4 w-4" />
          </span>
        )}
      </label>
      <div className="bg-base-200 h-10 rounded-md p-2 text-sm">
        {value || " "}
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="card bg-base-100 animate-pulse shadow-xl">
      <div className="card-body">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content h-24 w-24 rounded-full">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <div className="bg-base-300 h-8 w-48 rounded-md"></div>
              <div className="bg-base-300 mt-2 h-4 w-24 rounded-md"></div>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="bg-base-300 h-4 w-20 rounded-md"></div>
                  <div className="bg-base-300 h-10 w-full rounded-md"></div>
                </div>
              ))}
            </div>

            <div className="card-actions mt-6 justify-end">
              <div className="bg-base-300 h-10 w-32 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface UserAvatarProps {
  imageId: number;
  username: string;
  className?: string;
}

export function UserAvatar({ imageId, username, className }: UserAvatarProps) {
  const fallbackText = username.charAt(0).toUpperCase();

  return (
    <div className={`avatar placeholder ${className}`}>
      {!isNaN(imageId) ? (
        <div className="relative h-24 w-24 rounded-full">
          <Image
            src={`/profile/${imageId}.webp`}
            alt={username}
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="bg-neutral-focus text-neutral-content h-24 w-24 rounded-full">
          <span className="text-3xl">{fallbackText}</span>
        </div>
      )}
    </div>
  );
}
