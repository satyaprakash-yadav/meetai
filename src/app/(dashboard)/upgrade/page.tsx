import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
    UpgradeView,
    UpgradeViewError,
    UpgradeViewLoading,
} from "@/modules/premium/ui/views/upgrade-view";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    };

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.premium.getCurrentSubscription.queryOptions(),
    )
    void queryClient.prefetchQuery(
        trpc.premium.getProducts.queryOptions(),
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<UpgradeViewLoading />}>
                <ErrorBoundary fallback={<UpgradeViewError />}>
                    <UpgradeView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
}

export default Page;