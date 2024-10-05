import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import SuggestedUsers from "../SuggestedUsers/SuggestedUsers";

const FeedPosts = () => {
	const { isLoading, posts } = useGetFeedPosts();

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			<Box flex={3} mr={20} display={{ base: "block", md:"none" }} maxW={"300px"}>
				<SuggestedUsers />
			</Box>
			{!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
			{!isLoading && posts.length === 0 && (
				<>
					<Text w={{base: '80%' , md:'100%'}} fontSize={{md:"xl"}} color={"white.400"} textAlign={{base:'left', md:"center"}} fontWeight={"bold"} t>
						Dayuum, Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"white.100"}  textAlign={{base:'left', md:"center"}}>Stop coding and go make some!!</Text>
				</>
			)}
		</Container>
	);
};

export default FeedPosts;