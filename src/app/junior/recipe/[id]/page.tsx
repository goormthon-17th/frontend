import JuniorRecipeClient from '@/components/junior/JuniorRecipeClient';

const JuniorRecipePage = ({ params }: { params: { id: string } }) => {
  return <JuniorRecipeClient params={params} />;
};

export default JuniorRecipePage;
