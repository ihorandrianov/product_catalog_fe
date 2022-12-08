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
import { Footer } from '../../components/Footer';
import PhoneInfo from '../../components/PhoneInfo';
import Header from '../../components/Header';
import { Recomended } from '../../components/Recomended';
import Head from 'next/head';
import { createContextInner } from '../../server/context';

export async function getStaticProps(
  context: GetStaticPropsContext<{
    id: string;
  }>,
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
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
  const modelsQuery = trpc.details.getByModel.useQuery({
    id,
  });

  if (modelsQuery.status !== 'success') {
    return <>Loading</>;
  }
  const { data } = modelsQuery;
  return (
    <>
      <Head>
        <title>{data[0].name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Main page of NiceGadgets" />
      </Head>
      <Header />
      <PhoneInfo phones={data} />
      <Recomended title="You may also like" order="recomended" />
      <Footer />
    </>
  );
}

export default PhonePage;
