import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {

	const getPostEndPoint = () => {
		switch (feedType) {
			case "forYou":
				return "/api/posts/all"
			case "following":
				return "/api/posts/following"
			case "posts":
				return `/api/posts/users/${username}`;
			case "likes":
				return `/api/posts/likes/${userId}`;
			default: 
				return "/api/posts/all"
		}
	}
	
	const POST_ENDPOINT = getPostEndPoint();

	const { data, isLoading, error, isError, refetch, isRefetching } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong"); //throw error to error variable
				}

				return data;

			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username, userId]);

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && data?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && data && (
				<div>
					{data.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;