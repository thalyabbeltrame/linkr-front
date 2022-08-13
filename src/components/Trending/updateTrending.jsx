import { getTrendingRequest } from '../../services/apiRequests';

export const updateTrendingRequest = async (
  setLoading,
  setTrending,
  logout
) => {
  setLoading(true);
  try {
    const { data: trendingData } = await getTrendingRequest();
    setTrending(trendingData);
  } catch (err) {
    if (err.response.status === 401) {
      logout();
    }
  } finally {
    setLoading(false);
  }
};
