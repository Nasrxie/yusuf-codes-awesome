import { Code2, Database, Cloud, Cpu, Wrench } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: 'Languages',
      skills: ['C++', 'C#', 'Java', 'Python', 'JavaScript', 'HTML', 'CSS']
    },
    {
      icon: Cpu,
      title: 'ML & AI',
      skills: ['Supervised/Unsupervised Learning', 'CNNs', 'RNNs', 'TensorFlow', 'Keras', 'Scikit-learn']
    },
    {
      icon: Database,
      title: 'Data Technologies',
      skills: ['Pandas', 'NumPy', 'OpenCV', 'NLP', 'Data Visualization']
    },
    {
      icon: Cloud,
      title: 'Cloud & Tools',
      skills: ['AWS (EC2, S3, IAM)', 'Git', 'SQL', 'Jupyter', 'MATLAB']
    },
    {
      icon: Wrench,
      title: 'Development',
      skills: ['Object-Oriented Programming', 'Java Applications', 'Tkinter GUI']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="fade-in-up">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-foreground">
            My Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 hover-glow transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/20 rounded-xl mr-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="glow-tag inline-block px-3 py-1 rounded-lg mr-2 mb-2"
                    >
                      <span className="font-inter text-sm">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;