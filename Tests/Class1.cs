using NUnit.Framework;

[TestFixture]
public class ClassName
{
    [Test]
    public void Name()
    {
        Assert.That("1", Is.EqualTo("1"));   
    }
}