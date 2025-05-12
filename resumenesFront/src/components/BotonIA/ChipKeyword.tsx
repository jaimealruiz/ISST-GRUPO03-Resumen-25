export const ChipKeyword = ({ word }: { word: string }) => {
  return (
    <span
      style={{
        backgroundColor: '#6c5ce7',
        color: 'white',
        padding: '0.4rem 0.8rem',
        borderRadius: '9999px',
        fontSize: '0.9rem',
        fontWeight: 500,
      }}
    >
      {word}
    </span>
  )
}
