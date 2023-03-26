// Basic item card setup just to display the contents
const ItemCard = ({ label, nutrients }) => {
    return (
      <div>
        <h2>{label}</h2>
        <ul>
          <li>Calories: {nutrients.ENERC_KCAL}</li>
          <li>Protein: {nutrients.PROCNT}</li>
          <li>Fat: {nutrients.FAT}</li>
          <li>Carbs: {nutrients.CHOCDF}</li>
        </ul>
      </div>
    );
  };

const ItemCardList = ({ food }) => {
  return (
    <div>
      {food.map((food, index) => (
        <ItemCard key={index} 
                    label={food.label} 
                    nutrients={food.nutrients} />
      ))}
    </div>
  );
};

export default ItemCardList;