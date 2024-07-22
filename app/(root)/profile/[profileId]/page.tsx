'use client';
import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import ProfileCard from '@/components/ProfileCard';

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';

import React from 'react';

const Profile = ({ params: { profileId } }: { params: { profileId: string } }) => {
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, { authorId: profileId });
  const userData = useQuery(api.users.getUserById, { clerkId: profileId });
  // console.log(podcastsData);
  const userFirstName = userData?.name;
  const imageUrl = userData?.imageUrl;
  // const  userData = use

  if (!podcastsData) return <LoaderSpinner />;
  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Podcaster Profile</h1>
      </header>
      <ProfileCard userFirstName={userFirstName} imageUrl={imageUrl} podcastData={podcastsData!} />
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData && podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData?.podcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
              <PodcastCard
                key={_id}
                imgUrl={imageUrl!}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              />
            ))}
          </div>
        ) : (
          <>
            <EmptyState
              title="You have not created any podcasts yet"
              buttonLink="/create-podcast"
              buttonText="Create a Podcast"
              buttonIcon="/icons/microphone.svg"
            />
          </>
        )}
      </section>
    </section>
  );
};

export default Profile;
