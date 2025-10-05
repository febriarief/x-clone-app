import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SignOutButton from '@/components/SignOutButton';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { usePosts } from '@/hooks/usePosts';
import PostsList from '@/components/PostsList';

const ProfileScreen = () => {
  const {currentUser, isLoading} = useCurrentUser();
  const insets = useSafeAreaInsets();
  const {posts: userPosts, refetch: refetchPosts, isLoading: isRefreshing} = usePosts(currentUser?.username);

  if (isLoading) {
    return (
      <View className='flex-1 bg-white items-center justify-center'>
        <ActivityIndicator size='large' color='#1DA1F2'/>
      </View>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Header */}
      <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
        <View>
          <Text className='text-xl font-bold text-gray-900'>
            {currentUser.firstName} {currentUser.lastName} 
          </Text>
          <Text className='text-gray-500 text-sm'>2 Posts</Text>
        </View>
        <SignOutButton />
      </View>

      <ScrollView
        className='flex-1'
        contentContainerStyle={{paddingBottom: 100 + insets.bottom}}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{
            uri: currentUser.bannerImage || 'https://images.unsplash.com/photo-1759434192768-fe3facebd5f6?q=80&w=871&auto=format&fit=crop'
          }}
          className='w-full h-48'
          resizeMode='cover'
        />

        <View className='px-4 pb-4 border-b border-gray-100'>
          <View className='flex-row justify-between items-end -mt-16 mb-4'>
            <Image 
              source={{uri: currentUser.profilePicture }}
              className='w-32 h-32 rounded-full border-4 border-white'
            />

            <TouchableOpacity className='border border-gray-300 px-6 py-2 rounded-full'>
              <Text className='font-semibold text-gray-900'>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View className='mb-4'>
            <View className='flex-row items-center mb-1'>
              <Text className='text-xl font-bold text-gray-900 mr-1'>
                {currentUser.firstName} {currentUser.lastName}
              </Text>

              <Feather name='check-circle' size={20} color='#1DA1F2'/>
            </View>
            <Text className='text-gray-500 mb-2'>@{currentUser.username}</Text>
            <Text className='text-gray-900 mb-3'>{currentUser.bio}</Text>

            <View className='flex-row items-center mb-2'>
              <Feather name='map-pin' size={16} color='#657786'/>
              <Text className='text-gray-500 ml-2'>{currentUser.location}</Text>
            </View>

            <View className='flex-row items-center mb-3'>
              <Feather name='calendar' size={16} color='#657786'/>
              <Text className='text-gray-500 ml-2'>
                Joined {format(new Date(currentUser.createdAt), 'MMMM yyyy')}
              </Text>
            </View>

            <View className='flex-row'>
              <TouchableOpacity className='mr-6'>
                <Text className='text-gray-900'>
                  <Text className='font-bold'>{currentUser.following?.length}</Text>
                  <Text className='text-gray-500'> Following</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className='mr-6'>
                <Text className='text-gray-900'>
                  <Text className='font-bold'>{currentUser.followers?.length}</Text>
                  <Text className='text-gray-500'> Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <PostsList username={currentUser.username} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
