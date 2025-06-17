import { useNavigate } from 'react-router-dom';

function FashionTemplatePreview() {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    navigate('/edit/fashion');
  };

  return (
    <div>
      {/* Your preview content */}
      <button onClick={handleUseTemplate}>Use this Template</button>
    </div>
  );
}

export default FashionTemplatePreview;
