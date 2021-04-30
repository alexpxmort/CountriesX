
/**
 * Componente de Total
 * props total e label
 */


const Total = ({total,label}) =>{
    return (
        <h2 data-testid ="total_test" style={{marginLeft:10}}>Total of {label}: {total}</h2>
    )
}

export default Total