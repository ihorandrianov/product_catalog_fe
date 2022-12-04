import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { appRouter } from '../../server/routers/_app';
import superjson from 'superjson';
import { prisma } from '../../server/prisma';
import { trpc } from '../../utils/trpc';
import { Breedcrumbs } from '../../components/Breedcrumbs';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import PhoneInfo from '../../components/PhoneInfo';
import Header from '../../components/Header';
import { Recomended } from '../../components/Recomended';

const isSSR = () => typeof window === 'undefined';

export async function getStaticProps(
  context: GetStaticPropsContext<{
    id: string;
  }>,
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.details.getByModel.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const phones = await prisma.phoneDetails.findMany({
    select: {
      namespaceId: true,
    },
  });
  const phonesRoutes = new Set(phones.map((phone) => phone.namespaceId));

  return {
    paths: Array.from(phonesRoutes).map((phone) => ({
      params: {
        id: phone,
      },
    })),
    fallback: 'blocking',
  };
};

function PhonePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { id } = props;
  const { data, isLoading } = trpc.details.getByModel.useQuery({
    id,
  });

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <main>
      <Header />
      {data && <PhoneInfo phones={data} />}
      <Recomended />
      <Footer />
    </main>
  );
}

export default PhonePage;
