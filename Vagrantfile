# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
    if !Vagrant.has_plugin?("vagrant-vbguest")
        system('vagrant plugin install vagrant-vbguest')
        raise("vagrant-vbguest installed. Run command again.");
    end
    if !Vagrant.has_plugin?("vagrant-hosts")
        system('vagrant plugin install vagrant-hosts')
        raise("vagrant-hosts installed. Run command again.");
    end
    config.vm.network "private_network", type: "dhcp"
    config.vm.box = "centos/7"
    config.vm.provider "virtualbox" do |vb|
        vb.memory = "1024"
        vb.cpus = 2
    end
    config.vm.define "MeanJS" do |node|
        node.vm.provision "shell", path: "./bootstrap.sh", privileged: false
        node.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: ".git/"
        node.vm.network :private_network, :ip => '10.0.1.191'
        config.vm.network :forwarded_port, guest: 3000, host: 3000
    end
end
