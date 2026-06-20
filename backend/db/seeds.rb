categories = [
  { name: "Entertainment", color: "#6C63FF" },
  { name: "Productivity",  color: "#3ECFCF" },
  { name: "AI Tools",      color: "#FF6B6B" },
  { name: "Finance",       color: "#F7C948" },
  { name: "Education",     color: "#4CAF50" },
  { name: "Gaming",        color: "#FF9800" },
  { name: "Other",         color: "#9E9E9E" }
]

categories.each do |attrs|
  Category.find_or_create_by!(name: attrs[:name]) do |cat|
    cat.color = attrs[:color]
  end
end

puts "Seeded #{Category.count} categories."
