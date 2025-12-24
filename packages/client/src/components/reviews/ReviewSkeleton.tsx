import Skeleton from "react-loading-skeleton";

export default function ReviewSkeleton() {
    return (<div>
        <Skeleton width={150} />
        <Skeleton width={100} />
        <Skeleton count={2} />
    </div>)
}