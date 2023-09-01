

export default function FormItem({item, onItemValueChange}) {
    
    return (
        <div className="form-item">
            <label className="item-label">{item.name}:</label>
            <input value={item.value} onChange={(e) => onItemValueChange({...item, value: e.target.value})}></input>
        </div>
    )
}